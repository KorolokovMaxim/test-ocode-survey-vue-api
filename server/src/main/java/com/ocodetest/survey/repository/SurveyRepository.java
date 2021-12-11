package com.ocodetest.survey.repository;

import com.ocodetest.survey.entity.Survey;
import com.ocodetest.survey.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface SurveyRepository extends JpaRepository<Survey,Long> {

    Optional<Survey> findByName(String name);


}
