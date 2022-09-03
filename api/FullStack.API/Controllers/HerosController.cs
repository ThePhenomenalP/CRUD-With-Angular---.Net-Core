using FullStack.API.Data;
using FullStack.API.Models;
using FullStack.API.Models.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FullStack.API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class HerosController : Controller
  {
    private readonly FullStackDbContext db;
    private IWebHostEnvironment Environment;
    private IHttpContextAccessor httpContextAccessor;
    public HerosController(FullStackDbContext fullStackDbContext, IWebHostEnvironment _environment, IHttpContextAccessor _httpContextAccessor)
    {
      db = fullStackDbContext;
      Environment = _environment;
      httpContextAccessor = _httpContextAccessor;
    }

    #region Create

    [HttpPost]
    public async void AddHero([FromForm] HeroInterface heroRequest)
    {
      //Create random new Id
      UploadFile upf = new UploadFile(Environment, httpContextAccessor);
      Hero hero = new Hero();
      heroRequest.Id = Guid.NewGuid();
      hero.Id = heroRequest.Id;
      hero.Name = heroRequest.Name;
      hero.Type = heroRequest.Type;
      hero.Category = heroRequest.Category;
      hero.InitialMovementSpeed = heroRequest.InitialMovementSpeed;
      hero.IsPopular = heroRequest.IsPopular;
      hero.description = heroRequest.description;
      hero.ImageName = upf.upload(heroRequest.ImageName);
      await db.Heros.AddAsync(hero);
      db.SaveChanges();
    }
    #endregion

    #region Read
    [HttpGet]
    public async Task<IActionResult> GetAllHeros()
    {
      var Heros = await db.Heros.OrderBy(hero => hero.Name).ToListAsync();
      return Ok(Heros);
    }

    [HttpPost]
    [Route("/api/auth")]
    public Boolean userExist([FromBody] User userDetails)
    {
      var q = db.Users.Where(user => user.Username == userDetails.Username && user.Password == userDetails.Password);

      if (q.Count() >= 1)
      {
        return true;
      }
      else
      {
        return false;
      }
    }

    [HttpGet]
    [Route("{heroName}")]
    public async Task<IActionResult> searchForHero([FromRoute] string heroName)
    {
      var q = await db.Heros.Where(HN => HN.Name.Contains(heroName)).ToListAsync();
      if (q.Count >= 1)
      {
        return Ok(q);
      }
      else if (heroName == "")
      {
        var Heros = await db.Heros.OrderBy(hero => hero.Name).ToListAsync();
        return Ok(Heros);
      }
      else
      {
        return NotFound();
      }
    }
    #endregion

    #region Update
    [HttpPut]
    [Route("{id:Guid}")]
    public async Task<IActionResult> EditHero([FromRoute] Guid id, [FromForm] HeroInterface newHeroDetails)
    {
      UploadFile upf = new UploadFile(Environment, httpContextAccessor);
      var oldHero = await db.Heros.FindAsync(id);

      if (oldHero == null)
      {
        return NotFound();
      }

      oldHero.Name = newHeroDetails.Name;
      oldHero.Category = newHeroDetails.Category;
      oldHero.Type = newHeroDetails.Type;
      oldHero.InitialMovementSpeed = newHeroDetails.InitialMovementSpeed;
      oldHero.IsPopular = newHeroDetails.IsPopular;
      oldHero.description = newHeroDetails.description;
      if (newHeroDetails.ImageName != null)
      {
        oldHero.ImageName = upf.upload(newHeroDetails.ImageName);
      }

      await db.SaveChangesAsync();

      return Ok(oldHero);
    }
    #endregion

    #region Delete
    [HttpDelete]
    [Route("{id:Guid}")]
    public void deleteHero([FromRoute] Guid id)
    {
      var hero = db.Heros.Find(id);
      db.Heros.Remove(hero);
      db.SaveChanges();
    }
    #endregion

    #region Save Images
    [HttpPost]
    [Route("uploadImage")]
    public void SaveImage([FromForm] IFormFile Image)
    {
      UploadFile upf = new UploadFile(Environment, httpContextAccessor);

      upf.upload(Image);
    }
    #endregion
  }
}
