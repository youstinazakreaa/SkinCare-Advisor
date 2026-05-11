namespace skincare.api.Models
{
    public class Routine
    {
        public int Id { get; set; }

        public int SkinAnalysisId { get; set; }

        public string MorningSteps { get; set; } = string.Empty;

        public string NightSteps { get; set; } = string.Empty;

        public string FocusNote { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}