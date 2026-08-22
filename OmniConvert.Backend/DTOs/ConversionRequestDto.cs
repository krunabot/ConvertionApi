namespace OmniConvert.Backend.DTOs
{
    public class ConversionRequestDto
    {
        public string CategoryId { get; set; } = string.Empty;
        public double Value { get; set; }
        public string FromUnit { get; set; } = string.Empty;
        public string ToUnit { get; set; } = string.Empty;
    }
}
