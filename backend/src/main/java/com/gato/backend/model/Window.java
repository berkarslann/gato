package com.gato.backend.model;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import jakarta.persistence.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "window")
public class Window {

    @Id
    @Column(length = 36)  
    private String id;
    private String icon;
    private String windowType;
    private int xPosition;
    private int yPosition;

    @OneToMany(mappedBy = "startWindow", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Connection> connections;

    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;
}
