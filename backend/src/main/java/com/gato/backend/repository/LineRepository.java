package com.gato.backend.repository;

import com.gato.backend.model.Line;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LineRepository extends JpaRepository<Line, Long> {
    List<Line> findByProjectId(Long projectId);

}
