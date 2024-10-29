package fu.gr2.EcommerceProject.controller;

import fu.gr2.EcommerceProject.dto.request.EventCategoryCreateRequest;
import fu.gr2.EcommerceProject.entity.EventCategory;
import fu.gr2.EcommerceProject.service.EventCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/EventCate")
public class EventCategoryController {
    @Autowired
    private EventCategoryService eventCategoryService;
    @GetMapping
    List<EventCategory> getAllEventCategory() {
        return eventCategoryService.findAll();
    }
    @PostMapping("/create")
    EventCategory createEventCategory(@RequestBody EventCategoryCreateRequest request) {
        return eventCategoryService.create(request);
    }
}
