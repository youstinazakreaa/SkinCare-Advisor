using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using skincare.api.Data;
using skincare.api.Models;
using skincare.api.DTOs;
namespace skincare.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            var products = await _context.Products.ToListAsync();
            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProductById(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }
        [HttpPost("routine")]
        public async Task<ActionResult> GetRoutine(RoutineRequestDto request)
        {
            if (string.IsNullOrWhiteSpace(request.Budget))
            {
                return BadRequest("Budget is required.");
            }

            var morningProducts = await _context.Products
                .Where(p => p.Budget.ToLower() == request.Budget.ToLower()
                         && p.Period.ToLower() == "morning")
                .OrderBy(p => p.Category)
                .ToListAsync();

            var nightProducts = await _context.Products
                .Where(p => p.Budget.ToLower() == request.Budget.ToLower()
                         && p.Period.ToLower() == "night")
                .OrderBy(p => p.Category)
                .ToListAsync();

            var conflicts = await _context.ProductConflicts.ToListAsync();

            return Ok(new
            {
                morning = morningProducts,
                night = nightProducts,
                conflicts = conflicts
            });
        }




        [HttpPost]
        public async Task<ActionResult<Product>> AddProduct(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return Ok(product);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Product>> UpdateProduct(int id, Product updatedProduct)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            product.Name = updatedProduct.Name;
            product.Brand = updatedProduct.Brand;
            product.Category = updatedProduct.Category;
            product.Budget = updatedProduct.Budget;
            product.ImageUrl = updatedProduct.ImageUrl;
            product.Description = updatedProduct.Description;
            product.MatchesStep = updatedProduct.MatchesStep;
            product.Period = updatedProduct.Period;

            await _context.SaveChangesAsync();

            return Ok(product);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}