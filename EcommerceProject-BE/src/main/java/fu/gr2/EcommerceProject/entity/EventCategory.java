package fu.gr2.EcommerceProject.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "EventCategory")
@FieldDefaults(level = AccessLevel.PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class EventCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "Category_id")
    private int categoryId;
    @Column(name= "Category_name")
    private String name;
    @OneToMany(mappedBy = "eventCategory", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Event> events;

}
