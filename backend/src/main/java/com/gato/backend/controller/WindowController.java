package com.gato.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gato.backend.model.Window;
import com.gato.backend.service.IWindowService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/window")
public class WindowController {

    private final IWindowService windowService;

    public WindowController(IWindowService windowService) {
        this.windowService = windowService;
    }

    @GetMapping("/get-windows")
    public List<Window> getWindows() {
        return windowService.getWindows();
    }

    @PostMapping("/new-window")
    public Window addNewWindow(@RequestBody Window window) {
       
        return windowService.saveWindow(window);
    }

    @GetMapping("/{windowId}")
    public Window getSingleWindow(@PathVariable String windowId) {
        return windowService.getSingleWindow(windowId);
    }

    @PutMapping("/{windowId}")
    public Window updateWindow(@PathVariable String windowId, @RequestBody Window window) {
        return windowService.updateWindow(windowId, window);
    }

}
