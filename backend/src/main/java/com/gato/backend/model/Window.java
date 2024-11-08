package com.gato.backend.model;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import com.fasterxml.jackson.annotation.JsonBackReference;
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

    @ManyToOne
    @JoinColumn(name = "project_id")
    @JsonBackReference
    private Project project;
}
