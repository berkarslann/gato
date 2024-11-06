package com.gato.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gato.backend.model.Line;
import com.gato.backend.service.ILineService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/line")
public class LineController {

    private final ILineService lineService;

    public LineController(ILineService lineService) {
        this.lineService = lineService;
    }

    @GetMapping("/get-lines")
    public List<Line> getLines() {
        return lineService.getLines();
    }

    @PostMapping("/new-line")
    public Line addNewLine(@RequestBody Line line) {
        return lineService.saveLine(line);
    }

    @GetMapping("/{lineId}")
    public Line getSingleLine(@PathVariable Long lineId) {
        return lineService.getSingleLine(lineId);
    }

}
