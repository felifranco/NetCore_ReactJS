using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using WebAPI.Services;
using WebAPI.Models.DTOs;

namespace WebAPI.Controllers;

[Route("api/permission")]
[ApiController]
public class PermissionController : ControllerBase
{
    private readonly PermissionService _permissionService;

    public PermissionController(PermissionService permissionService)
    {
        _permissionService = permissionService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PermissionDTO>>> GetAllPermissions()
    {
        var permissions = await _permissionService.GetAllPermissionsAsync();
        return Ok(permissions);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<PermissionDTO>> GetPermissionById(int id)
    {
        var permission = await _permissionService.GetPermissionByIdAsync(id);
        if(permission == null) {
            return NotFound();
        }
        return Ok(permission);
    }

    [HttpPost]
    public async Task<ActionResult> AddPermission([FromBody] PermissionDTO permissionDto)
    {
        await _permissionService.AddPermissionAsync(permissionDto);
        return CreatedAtAction(nameof(GetPermissionById), new { id = permissionDto.Id }, permissionDto);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdatePermission(int id, [FromBody] PermissionDTO permissionDto)
    {
        if (id != permissionDto.Id)
        {
            return BadRequest();
        }
        _permissionService.UpdatePermissionAsync(permissionDto);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeletePermission(int id)
    {
        _permissionService.DeletePermissionAsync(id);
        return NoContent();
    }
}