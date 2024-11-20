package com.gato.backend.model;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "\"window\"")
public class Window {

    @Id
    @Column(length = 36)
    private String id;
    private String icon;
    private String windowType;

    @Column(name = "x_position")
    @JsonProperty("xPosition")
    private double xPosition;

    @Column(name = "y_position")
    @JsonProperty("yPosition")
    private double yPosition;

    @OneToMany(mappedBy = "startWindow", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Line> outgoingLines;

    @OneToMany(mappedBy = "endWindow", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Line> incomingLines;

    @ManyToOne
    @JoinColumn(name = "project_id")
    @JsonBackReference("project-window")
    private Project project;

}
