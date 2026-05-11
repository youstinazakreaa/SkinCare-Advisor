using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using skincare.api.Data;
using skincare.api.Models;
using skincare.api.DTOs;

namespace skincare.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDto dto)
        {
            var email = dto.Email.Trim().ToLower();

            var emailExists = await _context.Users
                .AnyAsync(u => u.Email.ToLower() == email);

            if (emailExists)
            {
                return BadRequest("Email already exists");
            }

            var user = new User
            {
                FullName = dto.FullName.Trim(),
                Email = email,
                Password = dto.Password,
                Role = "User"
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "User registered successfully",
                user.Id,
                user.FullName,
                user.Email,
                user.Role
            });
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login(LoginDto dto)
        {
            var email = dto.Email.Trim().ToLower();
            var password = dto.Password;

            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email.ToLower() == email);

            if (user == null || user.Password != password)
            {
                return BadRequest("Invalid email or password");
            }

            return Ok(new
            {
                message = "Login successful",
                user.Id,
                user.FullName,
                user.Email,
                user.Role
            });
        }

        [HttpPost("create-admin")]
        public async Task<ActionResult> CreateAdmin()
        {
            var adminEmail = "admin@skincare.com";
            var adminPassword = "Admin12345";
            
            var exists = await _context.Users
                .AnyAsync(u => u.Email.ToLower() == adminEmail);

            if (exists)
            {
                return BadRequest("Admin already exists");
            }

            var admin = new User
            {
                FullName = "System Admin",
                Email = adminEmail,
                Password = adminPassword,
                Role = "Admin"
            };

            _context.Users.Add(admin);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Admin created successfully",
                email = adminEmail,
                password = adminPassword
            });
        }
    }
}