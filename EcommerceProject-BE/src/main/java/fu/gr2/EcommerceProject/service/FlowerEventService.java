package fu.gr2.EcommerceProject.service;

import fu.gr2.EcommerceProject.entity.FlowerEventRelationship;
import fu.gr2.EcommerceProject.repository.FlowerEventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class FlowerEventService {
    @Autowired
    private FlowerEventRepository flowerEventRepository;
    public List<FlowerEventRelationship> getByEventId(int eventId) {
        return flowerEventRepository.findByEvent_EventId(eventId);
    }
}
