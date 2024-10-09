package fu.gr2.EcommerceProject.service;

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
}
