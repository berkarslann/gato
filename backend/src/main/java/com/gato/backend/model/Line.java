package com.gato.backend.model;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;


import jakarta.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "line")
public class Line {

    @Id
    @Column(length = 36)
    private String id;

    private int startX;
    private int startY;
    private int endX;
    private int endY;

    @ManyToOne
    @JoinColumn(name = "start_window_id")
    @JsonBackReference("startWindow-line")
    private Window startWindow;

    @ManyToOne
    @JoinColumn(name = "end_window_id")
    @JsonBackReference("endWindow-line")
    private Window endWindow;

    @ManyToOne
    @JoinColumn(name = "project_id")
    @JsonBackReference("project-line")
    private Project project;

}
