namespace skincare.api.Models
{
    public class ProductConflict
    {
        public int Id { get; set; }

        public string ProductOne { get; set; } = string.Empty;

        public string ProductTwo { get; set; } = string.Empty;

        public string Reason { get; set; } = string.Empty;
    }
}