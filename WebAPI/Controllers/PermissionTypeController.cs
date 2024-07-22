using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using WebAPI.Services;
using WebAPI.Models.DTOs;

namespace WebAPI.Controllers;

[Route("api/permission-type")]
[ApiController]
public class PermissionTypeController : ControllerBase
{
    private readonly PermissionTypeService _permissionTypeService;

    public PermissionTypeController(PermissionTypeService permissionTypeService)
    {
        _permissionTypeService = permissionTypeService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PermissionTypeDTO>>> GetAllPermissionTypes()
    {
        var permissionTypes = await _permissionTypeService.GetAllPermissionTypesAsync();
        return Ok(permissionTypes);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<PermissionTypeDTO>> GetPermissionTypeById(int id)
    {
        var permissionType = await _permissionTypeService.GetPermissionTypeByIdAsync(id);
        if(permissionType == null) {
            return NotFound();
        }
        return Ok(permissionType);
    }

    [HttpPost]
    public async Task<ActionResult> AddPermissionType([FromBody] PermissionTypeDTO permissionTypeDto)
    {
        await _permissionTypeService.AddPermissionTypeAsync(permissionTypeDto);
        return CreatedAtAction(nameof(GetPermissionTypeById), new { id = permissionTypeDto.Id }, permissionTypeDto);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdatePermissionType(int id, [FromBody] PermissionTypeDTO permissionTypeDto)
    {
        if (id != permissionTypeDto.Id)
        {
            return BadRequest();
        }
        _permissionTypeService.UpdatePermissionTypeAsync(permissionTypeDto);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeletePermissionType(int id)
    {
        _permissionTypeService.DeletePermissionTypeAsync(id);
        return NoContent();
    }
}