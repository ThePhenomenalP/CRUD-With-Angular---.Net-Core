namespace FullStack.API.Models.Interfaces
{
    public class HeroInterface
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public string Type { get; set; }
        public int InitialMovementSpeed { get; set; }
        public Boolean IsPopular { get; set; }
        public string description { get; set; }
        public IFormFile ImageName { get; set; }
    }
}
