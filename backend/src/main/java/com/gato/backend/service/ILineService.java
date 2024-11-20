package com.gato.backend.service;

import java.util.List;

import com.gato.backend.model.Line;
import com.gato.backend.model.Window;

public interface ILineService {

        List<Line> getLines();

        List<Line> getLinesByProjectId(Long projectId);

        Line getSingleLine(Long lineId);

        Line updateLine(Long lineId, Line line);

        Line saveLine(Line line);

        void deleteLine(Long lineId);

}
