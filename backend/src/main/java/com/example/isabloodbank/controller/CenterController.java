package com.example.isabloodbank.controller;
import com.example.isabloodbank.dto.CenterDTO;
import com.example.isabloodbank.model.Center;
import com.example.isabloodbank.service.ICenterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/centers")
public class CenterController {

    @Autowired
    ICenterService centerService;
    
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Center>> getAll(@RequestParam("sort-order") Optional<String> sortOrder, @RequestParam("sort-by") Optional<String> sortBy,
                                               @RequestParam("filter-min") Optional<Double> filterMin, @RequestParam("filter-max") Optional<Double> filterMax,
                                               @RequestParam("search-name") Optional<String> searchName, @RequestParam("search-street") Optional<String> searchStreet, @RequestParam("search-town") Optional<String> searchTown) {
        List<Center> centers;
        if(filterMin.isPresent() && filterMax.isPresent()){
            centers = centerService.getAll(filterMin.get(), filterMax.get());
            if(centers.isEmpty())
                return new ResponseEntity<>(centers, HttpStatus.OK);
        }else{
            centers = centerService.getAll();
        }

        centers = centerService.getAll(searchName,searchStreet, searchTown, centers);
        if(centers.isEmpty())
            return new ResponseEntity<>(centers, HttpStatus.OK);


        if (sortOrder.isPresent() && sortBy.isPresent()) {
            if ((!sortOrder.get().equals("asc") && !sortOrder.get().equals("desc")) ||
                    (!sortBy.get().equals("name") && !sortBy.get().equals("city") && !sortBy.get().equals("rating"))) {
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }
            centers = centerService.getAll(sortBy.get(), sortOrder.get(), centers);
        }
        return new ResponseEntity<>(centers, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<CenterDTO> create(@RequestBody CenterDTO centerDTO) throws Exception {
        return ResponseEntity.status(HttpStatus.CREATED).body(centerService.create(centerDTO));
    }
    @GetMapping("/{id}")
    public Center getById(@PathVariable("id") Long id) {
        return centerService.getById(id);
    }
    @PutMapping("/{id}")
    public Center edit(@RequestBody Center center, @PathVariable("id") Long id){
        return centerService.edit(center, id);

    }

    @GetMapping("/filterScore")
    @ResponseBody
    public ResponseEntity<List<Center>> getAlLByFilter(@RequestParam("filter-min") Optional<Double> filterMin, @RequestParam("filter-max") Optional<Double> filterMax){
        List<Center> centers;
        if(filterMin.isPresent() && filterMax.isPresent()){
            centers = centerService.getAll(filterMin.get(), filterMax.get());
        }else{
            centers = centerService.getAll();
        }
        return new ResponseEntity<>(centers, HttpStatus.OK);
    }
}
