package fu.gr2.EcommerceProject.controller;

import fu.gr2.EcommerceProject.entity.EventCategory;
import fu.gr2.EcommerceProject.service.EventCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class EventCategoryController {
    @Autowired
    private EventCategoryService eventCategoryService;
    @GetMapping("/eventcate")
    List<EventCategory> getAllEventCategory() {
        return eventCategoryService.findAll();
    }
}
