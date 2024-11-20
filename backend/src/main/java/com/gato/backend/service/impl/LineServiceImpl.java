package com.gato.backend.service.impl;

import com.gato.backend.model.Line;
import com.gato.backend.repository.LineRepository;
import com.gato.backend.service.ILineService;

import jakarta.persistence.EntityNotFoundException;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class LineServiceImpl implements ILineService {

    private final LineRepository lineRepository;

    public LineServiceImpl(LineRepository lineRepository) {
        this.lineRepository = lineRepository;
    }

    @Override
    public List<Line> getLines() {
        return lineRepository.findAll();
    }

    @Override
    public List<Line> getLinesByProjectId(Long projectId) {
        return lineRepository.findByProjectId(projectId);
    }

    @Override
    public Line saveLine(Line line) {
        return lineRepository.save(line);
    }

    @Override
    public void deleteLine(Long lineId) {
        lineRepository.deleteById(lineId);
    }

    public Line getSingleLine(Long lineId) {
        return lineRepository.findById(lineId)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + lineId));
    }

    @Override
    public Line updateLine(Long lineId, Line line) {
        Line existingLine = lineRepository.findById(lineId)
                .orElseThrow(() -> new EntityNotFoundException("Window with ID " + lineId + " not found."));

        existingLine.setEndX(line.getEndX());
        existingLine.setEndY(line.getEndY());
        existingLine.setStartX(line.getEndX());

        existingLine.setStartY(line.getEndY());
        return lineRepository.save(existingLine);
    }

}