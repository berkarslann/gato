package com.gato.backend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.gato.backend.repository.WindowRepository;
import com.gato.backend.model.Window;
import com.gato.backend.service.IWindowService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class WindowServiceImpl implements IWindowService {

    private final WindowRepository windowRepository;

    public WindowServiceImpl(WindowRepository windowRepository) {
        this.windowRepository = windowRepository;
    }

    @Override
    public List<Window> getWindows() {
        return windowRepository.findAll();

    }

    @Override
    public Window saveWindow(Window window) {
        return windowRepository.save(window);
    }

    @Override
    public void deleteWindow(String windowId) {
        windowRepository.deleteById(windowId);
    }

    public Window getSingleWindow(String windowId) {
        return windowRepository.findById(windowId)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + windowId));
    }

    @Override
    public Window updateWindow(String windowId, Window newWindow) {
        Window existingWindow = windowRepository.findById(windowId)
                .orElseThrow(() -> new EntityNotFoundException("Window with ID " + windowId + " not found."));

        existingWindow.setIcon(newWindow.getIcon());
        existingWindow.setXPosition(newWindow.getXPosition());
        existingWindow.setYPosition(newWindow.getYPosition());
        existingWindow.setWindowType(newWindow.getWindowType());
        return windowRepository.save(existingWindow);
    }

}