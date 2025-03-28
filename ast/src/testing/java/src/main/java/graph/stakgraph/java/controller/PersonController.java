package graph.gevity.java.controller;

import graph.gevity.java.model.Person;
import graph.gevity.java.repository.PersonRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.Optional;

@RestController
@RequestMapping("/person")
public class PersonController {
    private final PersonRepository repository;

    public PersonController(PersonRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Person> getPerson(@PathVariable Long id) {
        Optional<Person> person = getPersonById(id);
        return person.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Person createPerson(@RequestBody Person person) {
        return newPerson(person);
    }

    private Optional<Person> getPersonById(Long id) {
        return repository.findById(id);
    }

    private Person newPerson(Person person) {
        return repository.save(person);
    }
}