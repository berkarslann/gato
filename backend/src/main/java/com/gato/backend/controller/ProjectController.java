package com.gato.backend.controller;

import java.util.List;


import org.springframework.web.bind.annotation.*;

import com.gato.backend.model.Project;
import com.gato.backend.service.IProjectService;

@RestController
@RequestMapping("/project")
public class ProjectController {

    private final IProjectService projectService;


    public ProjectController(IProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping("/get-projects")
    public List<Project> getProjects() {
        return projectService.getProjects();
    }

    @PostMapping("/new-project")
    public Project addNewProject(@RequestBody Project project) {
        return projectService.saveProject(project);
    }

    @GetMapping("/{projectId}")
    public Project getProjectById(@PathVariable Long projectId) {
        return projectService.getSingleProject(projectId);
    }
    
}
