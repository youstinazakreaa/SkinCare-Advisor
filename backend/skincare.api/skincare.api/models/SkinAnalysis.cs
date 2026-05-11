namespace skincare.api.Models
{
    public class SkinAnalysis
    {
        public int Id { get; set; }

        public int? UserId { get; set; }

        public string SkinType { get; set; } = string.Empty;
        public string AgeGroup { get; set; } = string.Empty;
        public string Budget { get; set; } = string.Empty;

        public string SunExposure { get; set; } = string.Empty;
        public string WaterLevel { get; set; } = string.Empty;
        public string Concerns { get; set; } = string.Empty;
        public string Habits { get; set; } = string.Empty;
        public string SelectedProducts { get; set; } = string.Empty;

        public string AcneNow { get; set; } = string.Empty;
        public string Irritation { get; set; } = string.Empty;
        public string Makeup { get; set; } = string.Empty;
        public string Allergies { get; set; } = string.Empty;
        public string Sleep { get; set; } = string.Empty;
        public string Stress { get; set; } = string.Empty;
        public string Diet { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}