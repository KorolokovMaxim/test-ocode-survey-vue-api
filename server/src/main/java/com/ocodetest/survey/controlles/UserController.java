package com.ocodetest.survey.controlles;


import com.ocodetest.survey.entity.Survey;
import com.ocodetest.survey.entity.User;
import com.ocodetest.survey.payload.request.CompletedSurveyRequest;
import com.ocodetest.survey.payload.response.MessageResponse;
import com.ocodetest.survey.payload.response.QuestionAnswerResponse;
import com.ocodetest.survey.payload.response.ViewUserAnswer;
import com.ocodetest.survey.repository.UserRepository;
import com.ocodetest.survey.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user/")
@PreAuthorize("{permitAll()}")
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;


    public UserController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }



    @GetMapping("/get-all-surveys")
    public ResponseEntity<List<Survey>> getAllSurveys() {
        List<Survey> surveyList = userService.getAllSurveys();
        return new ResponseEntity<>(surveyList, HttpStatus.OK);
    }

    @GetMapping("/completed-surveys")
    public ResponseEntity<List<Survey>> getUserCompletedSurveys(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        User user = userRepository.findByUsername(username).orElseThrow();

        return new ResponseEntity<>( user.getSurveyUser() , HttpStatus.OK);
    }

    @GetMapping("/survey/{surveyId}")
    public ResponseEntity<List<QuestionAnswerResponse>> getSurveyForCompleted(@PathVariable Long surveyId){
        List<QuestionAnswerResponse> questionAnswerResponseList = userService.getSurveyForCompleted(surveyId);
        return new ResponseEntity<>(questionAnswerResponseList,HttpStatus.OK);
    }

    @PostMapping("/survey/{surveyId}/saveCompletedSurvey")
    public ResponseEntity<Survey> saveCompletedSurvey(@PathVariable Long surveyId,
                                                 @RequestBody CompletedSurveyRequest request){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();

       Survey survey = userService.saveCompletedSurvey(request.getAnswers(), username, surveyId);
        return new ResponseEntity<>(survey, HttpStatus.OK);
    }

    @GetMapping("/show-completed-survey/{surveyId}")
    public ResponseEntity<List<ViewUserAnswer>> showCompletedUserSurvey(@PathVariable Survey surveyId){


        List<ViewUserAnswer> viewUserAnswerList = userService.showCompletedUserSurvey(surveyId);
        return new ResponseEntity<>(viewUserAnswerList, HttpStatus.OK);
    }
}
