package com.gato.backend.repository;

import com.gato.backend.model.Window;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WindowRepository extends JpaRepository<Window, String> {

    

}
