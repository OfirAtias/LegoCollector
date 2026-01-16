using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Repositories;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize] 
    public class LegoController : ControllerBase
    {
        private readonly ILegoRepository _legoRepository;

        public LegoController(ILegoRepository legoRepository)
        {
            _legoRepository = legoRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var sets = _legoRepository.GetAll();
            return Ok(sets);
        }

        [HttpPost]
        public IActionResult Add([FromBody] LegoSet legoSet)
        {
            _legoRepository.Add(legoSet);
            return CreatedAtAction(nameof(GetAll), new { id = legoSet.Id }, legoSet);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _legoRepository.Delete(id);
            return NoContent();
        }
    }
}