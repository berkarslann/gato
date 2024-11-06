package com.gato.backend.service.impl;

import java.util.List;


import org.springframework.stereotype.Service;
import com.gato.backend.model.Project;
import com.gato.backend.repository.ProjectRepository;
import com.gato.backend.service.IProjectService;

@Service
public class ProjectServiceImpl implements IProjectService {

    private final ProjectRepository projectRepository;


    public ProjectServiceImpl(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    public List<Project> getProjects(){
        return projectRepository.findAll();
    }

    @Override
    public Project saveProject(Project project) {
        return projectRepository.save(project);
    }

    public Project getSingleProject(Long projectId){
        return projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + projectId));
 }
}