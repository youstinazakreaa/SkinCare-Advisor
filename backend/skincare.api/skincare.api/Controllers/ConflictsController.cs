using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using skincare.api.Data;
using skincare.api.Models;

namespace skincare.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConflictsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ConflictsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<ProductConflict>>> GetAllConflicts()
        {
            var conflicts = await _context.ProductConflicts.ToListAsync();

            return Ok(conflicts);
        }

        [HttpPost]
        public async Task<ActionResult<ProductConflict>> AddConflict(ProductConflict conflict)
        {
            _context.ProductConflicts.Add(conflict);

            await _context.SaveChangesAsync();

            return Ok(conflict);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteConflict(int id)
        {
            var conflict = await _context.ProductConflicts.FindAsync(id);

            if (conflict == null)
            {
                return NotFound();
            }

            _context.ProductConflicts.Remove(conflict);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}