namespace FullStack.API.Models
{
    public class Hero
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public string Type{ get; set; }
        public int InitialMovementSpeed{ get; set; }
        public Boolean IsPopular{ get; set; }
        public string description{ get; set; }
        public string ImageName{ get; set; }
    }
}
