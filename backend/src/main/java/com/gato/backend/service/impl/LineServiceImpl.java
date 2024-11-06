package com.gato.backend.service.impl;

import com.gato.backend.model.Line;
import com.gato.backend.repository.LineRepository;
import com.gato.backend.service.ILineService;

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

}