using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Moq;
using WebAPI.Controllers;
using WebAPI.Services.Interfaces;
using WebAPI.Models.DTOs;

namespace WebAPI.Tests.Controllers;

public class PermissionControllerTesting
{
    private readonly PermissionController _controller;
    private readonly Mock<IPermissionService> _mockService;

    public PermissionControllerTesting()
    {
        _mockService = new Mock<IPermissionService>();
        _controller = new PermissionController(_mockService.Object);
    }

    [Fact]
    public void GetAllPermissions()
    {
        _mockService.Setup(service => service.GetAllPermissionsAsync()).ReturnsAsync(new List<PermissionDTO> {});

        var result = _controller.GetAllPermissions();

        //Assert.IsType<OkObjectResult>(result);
        //var okResult = Assert.IsType<ActionResult>(result.Result);
        var returnValue = Assert.IsType<List<PermissionDTO>>(result.Value);

        //var actionResult = Assert.IsType<OkResult>(result);

    }
}