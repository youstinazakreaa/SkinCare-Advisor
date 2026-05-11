using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using skincare.api.Data;
using skincare.api.Models;

namespace skincare.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoutineController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RoutineController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> GetGeneratedRoutines()
        {
            var routines = await _context.Routines
                .OrderByDescending(r => r.CreatedAt)
                .Select(r => new
                {
                    r.Id,
                    r.SkinAnalysisId,

                    UserName = _context.Users
                        .Where(u => u.Id == _context.SkinAnalyses
                            .Where(a => a.Id == r.SkinAnalysisId)
                            .Select(a => a.UserId)
                            .FirstOrDefault())
                        .Select(u => u.FullName)
                        .FirstOrDefault(),

                    SkinType = _context.SkinAnalyses
                        .Where(a => a.Id == r.SkinAnalysisId)
                        .Select(a => a.SkinType)
                        .FirstOrDefault(),

                    Budget = _context.SkinAnalyses
                        .Where(a => a.Id == r.SkinAnalysisId)
                        .Select(a => a.Budget)
                        .FirstOrDefault(),

                    Concerns = _context.SkinAnalyses
                        .Where(a => a.Id == r.SkinAnalysisId)
                        .Select(a => a.Concerns)
                        .FirstOrDefault(),

                    r.MorningSteps,
                    r.NightSteps,
                    r.FocusNote,
                    r.CreatedAt
                })
                .ToListAsync();

            return Ok(routines);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Routine>> GetRoutineById(int id)
        {
            var routine = await _context.Routines.FindAsync(id);

            if (routine == null)
                return NotFound("Routine not found");

            return Ok(routine);
        }

        [HttpPost("generate/{analysisId}")]
        public async Task<ActionResult<Routine>> GenerateRoutine(int analysisId)
        {
            var analysis = await _context.SkinAnalyses.FindAsync(analysisId);

            if (analysis == null)
                return NotFound("Analysis not found");

            var existingRoutine = await _context.Routines
                .FirstOrDefaultAsync(r => r.SkinAnalysisId == analysisId);

            if (existingRoutine != null)
                return Ok(existingRoutine);

            var morningSteps = BuildMorningSteps(analysis);
            var nightSteps = BuildNightSteps(analysis);

            var routine = new Routine
            {
                SkinAnalysisId = analysis.Id,
                MorningSteps = string.Join(",", morningSteps),
                NightSteps = string.Join(",", nightSteps),
                FocusNote = GetFocusNote(analysis),
                CreatedAt = DateTime.Now
            };

            _context.Routines.Add(routine);
            await _context.SaveChangesAsync();

            return Ok(routine);
        }

        private List<string> BuildMorningSteps(SkinAnalysis analysis)
        {
            var morningSteps = new List<string> { "Cleanser" };

            var concerns = (analysis.Concerns ?? "").ToLower();
            var skinType = (analysis.SkinType ?? "").ToLower();

            if (concerns.Contains("dark") || concerns.Contains("spots"))
                morningSteps.Add("Vitamin C");

            if (skinType.Contains("oily") || concerns.Contains("acne") || concerns.Contains("pores"))
                morningSteps.Add("Niacinamide");

            if (skinType.Contains("dry"))
                morningSteps.Add("Hydrating Serum");

            morningSteps.Add("Moisturizer");
            morningSteps.Add("Sunscreen");

            return morningSteps.Distinct().ToList();
        }

        private List<string> BuildNightSteps(SkinAnalysis analysis)
        {
            var nightSteps = new List<string> { "Cleanser" };

            var concerns = (analysis.Concerns ?? "").ToLower();
            var skinType = (analysis.SkinType ?? "").ToLower();
            var irritation = (analysis.Irritation ?? "").ToLower();

            if (concerns.Contains("acne") || (analysis.AcneNow ?? "").ToLower() == "yes")
                nightSteps.Add("Acne Treatment");

            if (concerns.Contains("pores") || concerns.Contains("texture"))
                nightSteps.Add("AHA/BHA");

            if (skinType.Contains("dry") || skinType.Contains("sensitive") || irritation == "yes")
                nightSteps.Add("Barrier Repair");

            nightSteps.Add("Moisturizer");

            return nightSteps.Distinct().ToList();
        }

        private string GetFocusNote(SkinAnalysis analysis)
        {
            var concerns = (analysis.Concerns ?? "").ToLower();
            var skinType = (analysis.SkinType ?? "").ToLower();
            var irritation = (analysis.Irritation ?? "").ToLower();

            if (skinType.Contains("sensitive") || irritation == "yes")
                return "Focus on calming and repairing the skin barrier before using strong active ingredients.";

            if (concerns.Contains("acne"))
                return "Focus on oil control, clogged pores and gentle acne treatment.";

            if (concerns.Contains("dark") || concerns.Contains("spots"))
                return "Focus on brightening, even skin tone and daily sun protection.";

            if (concerns.Contains("wrinkles") || analysis.AgeGroup == "Above 40")
                return "Focus on hydration, renewal and anti-aging support.";

            return "Focus on maintaining a simple, balanced and consistent routine.";
        }
    }
}