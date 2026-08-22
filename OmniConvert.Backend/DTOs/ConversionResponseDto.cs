namespace OmniConvert.Backend.DTOs
{
    public class ConversionResponseDto
    {
        public string CategoryId { get; set; } = string.Empty;
        public double InputValue { get; set; }
        public string FromUnit { get; set; } = string.Empty;
        public string ToUnit { get; set; } = string.Empty;
        public double Result { get; set; }
        public string FormattedResult { get; set; } = string.Empty;
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    }
}
