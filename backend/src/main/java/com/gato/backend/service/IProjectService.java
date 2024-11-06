package com.gato.backend.service;

import java.util.List;

import com.gato.backend.model.Project;

public interface IProjectService {


    List<Project> getProjects();
    Project saveProject(Project project);
    Project getSingleProject(Long projectId);
    
}
