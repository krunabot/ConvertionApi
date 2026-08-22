namespace OmniConvert.Backend.Models
{
    public class UnitDefinition
    {
        public string Code { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public double Factor { get; set; }
    }

    public class CategoryDefinition
    {
        public string Id { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public bool IsSpecial { get; set; }
        public Dictionary<string, UnitDefinition> Units { get; set; } = new();
    }
}
