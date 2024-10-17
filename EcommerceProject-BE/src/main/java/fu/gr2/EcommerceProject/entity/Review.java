package fu.gr2.EcommerceProject.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Reviews")
@Getter
@Setter
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Review_Id", nullable = false)
    private  Integer reviewID;

    @ElementCollection
    @CollectionTable(name = "review_comment", joinColumns = @JoinColumn(name = "review_id"))
    @Column(name = "comment")
    private  List<String> comments = new ArrayList<>();

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private  LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "event_id", nullable = false)
    private  Event event;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}