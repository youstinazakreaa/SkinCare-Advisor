using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using skincare.api.Data;
using skincare.api.Models;

namespace skincare.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnalysisController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AnalysisController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<SkinAnalysis>>> GetAllAnalyses()
        {
            var analyses = await _context.SkinAnalyses.ToListAsync();
            return Ok(analyses);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SkinAnalysis>> GetAnalysisById(int id)
        {
            var analysis = await _context.SkinAnalyses.FindAsync(id);

            if (analysis == null)
                return NotFound();

            return Ok(analysis);
        }

        [HttpGet("user/{userId}/latest-result")]
        public async Task<ActionResult> GetLatestAnalysisResultForUser(int userId)
        {
            var analysis = await _context.SkinAnalyses
                .Where(a => a.UserId == userId)
                .OrderByDescending(a => a.CreatedAt)
                .FirstOrDefaultAsync();

            if (analysis == null)
                return NotFound("No analysis found for this user");

            var result = await BuildAnalysisResult(analysis);
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult> AddAnalysis(SkinAnalysis analysis)
        {
            _context.SkinAnalyses.Add(analysis);
            await _context.SaveChangesAsync();

            var result = await BuildAnalysisResult(analysis);
            return Ok(result);
        }

        private async Task<object> BuildAnalysisResult(SkinAnalysis analysis)
        {
            string Normalize(string value)
            {
                return (value ?? "").Trim().ToLower();
            }

            string NormalizeStep(string step)
            {
                step = Normalize(step);

                if (step.Contains("vitamin c")) return "Vitamin C";
                if (step.Contains("niacinamide")) return "Niacinamide";
                if (step.Contains("cleanser")) return "Cleanser";
                if (step.Contains("sunscreen")) return "Sunscreen";
                if (step.Contains("acne")) return "Acne Treatment";
                if (step.Contains("aha") || step.Contains("bha")) return "AHA/BHA";
                if (step.Contains("hydrating")) return "Hydrating Serum";
                if (step.Contains("barrier")) return "Barrier Repair";
                if (step.Contains("moisturizer")) return "Moisturizer";

                return step;
            }

            var budget = Normalize(analysis.Budget);

            var allProducts = await _context.Products
                .Where(p => p.Budget.Trim().ToLower() == budget)
                .ToListAsync();

            var morningSteps = new List<string>
            {
                "Cleanser",
                "Moisturizer",
                "Sunscreen"
            };

            var nightSteps = new List<string>
            {
                "Cleanser",
                "Moisturizer"
            };

            var tips = new List<string>();
            var aiNotes = new List<string>();

            var skinType = Normalize(analysis.SkinType);
            var concerns = Normalize(analysis.Concerns);

            if (skinType.Contains("oily"))
                morningSteps.Insert(1, NormalizeStep("Niacinamide"));

            if (skinType.Contains("dry"))
                morningSteps.Insert(1, NormalizeStep("Hydrating Serum"));

            if (concerns.Contains("dark") || concerns.Contains("spots"))
                morningSteps.Insert(1, NormalizeStep("Vitamin C"));

            if (concerns.Contains("acne") || Normalize(analysis.AcneNow) == "yes")
                nightSteps.Insert(1, NormalizeStep("Acne Treatment"));

            if (concerns.Contains("pores") || concerns.Contains("texture"))
                nightSteps.Insert(1, NormalizeStep("AHA/BHA"));

            if (skinType.Contains("dry"))
                nightSteps.Add(NormalizeStep("Barrier Repair"));

            if (Normalize(analysis.Irritation) == "yes" ||
                Normalize(analysis.Allergies) == "yes")
            {
                tips.Add("Avoid strong active ingredients due to sensitivity.");
            }

            if (Normalize(analysis.SunExposure).Contains("high"))
                tips.Add("Use sunscreen daily.");

            if (Normalize(analysis.WaterLevel).Contains("low"))
                tips.Add("Increase water intake.");

            if (Normalize(analysis.Stress) == "yes")
                tips.Add("Stress may affect skin health.");

            var morningProducts = allProducts
                .Where(p => Normalize(p.Period) == "morning")
                .Where(p => morningSteps.Any(step =>
                    Normalize(p.MatchesStep) == Normalize(step)
                ))
                .ToList();

            var nightProducts = allProducts
                .Where(p => Normalize(p.Period) == "night")
                .Where(p => nightSteps.Any(step =>
                    Normalize(p.MatchesStep) == Normalize(step)
                ))
                .ToList();


            var conflicts = await _context.ProductConflicts
        .Take(2)
        .ToListAsync();

            var existingRoutine = await _context.Routines
                .FirstOrDefaultAsync(r => r.SkinAnalysisId == analysis.Id);

            if (existingRoutine == null)
            {
                var routine = new Routine
                {
                    SkinAnalysisId = analysis.Id,
                    MorningSteps = string.Join(",", morningSteps),
                    NightSteps = string.Join(",", nightSteps),
                    FocusNote = "Generated automatically from AI analysis.",
                    CreatedAt = DateTime.Now
                };

                _context.Routines.Add(routine);
                await _context.SaveChangesAsync();
            }

            return new
            {
                message = "AI skin analysis completed successfully",

                analysis.Id,
                analysis.UserId,

                skinType = analysis.SkinType,
                ageGroup = analysis.AgeGroup,
                budget = analysis.Budget,
                sunExposure = analysis.SunExposure,
                waterLevel = analysis.WaterLevel,
                concerns = analysis.Concerns,
                habits = analysis.Habits,
                selectedProducts = analysis.SelectedProducts,

                acneNow = analysis.AcneNow,
                irritation = analysis.Irritation,
                makeup = analysis.Makeup,
                allergies = analysis.Allergies,
                sleep = analysis.Sleep,
                stress = analysis.Stress,
                diet = analysis.Diet,

                tips,
                aiNotes,

                morningSteps,
                nightSteps,

                morningRoutine = morningProducts,
                nightRoutine = nightProducts,

                conflicts
            
        };
        }
    }
}