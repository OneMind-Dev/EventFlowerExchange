package fu.gr2.EcommerceProject.service;

import fu.gr2.EcommerceProject.dto.request.EventCategoryCreateRequest;
import fu.gr2.EcommerceProject.entity.EventCategory;
import fu.gr2.EcommerceProject.repository.EventCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventCategoryService {
    @Autowired
    private EventCategoryRepository eventCategoryRepository;

    public List<EventCategory> findAll() {
        return eventCategoryRepository.findAll();
    }

    public EventCategory create(EventCategoryCreateRequest request) {
        EventCategory eventCategory = new EventCategory();
        eventCategory.setName(request.getName());
        return eventCategoryRepository.save(eventCategory);
    }
}
