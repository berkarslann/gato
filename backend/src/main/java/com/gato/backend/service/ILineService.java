package com.gato.backend.service;

import java.util.List;

import com.gato.backend.model.Line;

public interface ILineService {

        List<Line> getLines();

        Line getSingleLine(Long lineId);

        Line saveLine(Line line);

        void deleteLine(Long lineId);

}
