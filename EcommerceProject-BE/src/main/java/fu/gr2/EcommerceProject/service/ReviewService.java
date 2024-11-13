package fu.gr2.EcommerceProject.service;

import fu.gr2.EcommerceProject.dto.request.ApiResponse;
import fu.gr2.EcommerceProject.dto.request.CommentRequest;
import fu.gr2.EcommerceProject.entity.Event;
import fu.gr2.EcommerceProject.entity.Review;
import fu.gr2.EcommerceProject.entity.User;
import fu.gr2.EcommerceProject.exception.AppException;
import fu.gr2.EcommerceProject.exception.ErrorCode;
import fu.gr2.EcommerceProject.repository.EventRepository;
import fu.gr2.EcommerceProject.repository.ReviewRepository; // Assuming you have a repository layer
import fu.gr2.EcommerceProject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
    public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    public ApiResponse<Review> addComment(Integer eventId, CommentRequest commentRequest) {
        List<String> notifications = new ArrayList<>();

        // Validate and find the event
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new AppException(ErrorCode.EVENT_NOT_EXISTED));

        // Validate and find the user
        User user = userRepository.findById(commentRequest.getUserId())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        // Create and save the review
        Review review = new Review();
        review.setEvent(event);
        review.setUser(user);
        review.getComments().add(commentRequest.getComment());

        // Save the review
        Review savedReview = reviewRepository.save(review);

        String successMessage = "Comment added successfully to Event ID: " + eventId;
        notifications.add(successMessage); // Add message to notifications


        return ApiResponse.<Review>builder()
                .result(savedReview)
                .message(successMessage)
                .notifications(notifications)
                .build();
    }

    public ApiResponse<Review> updateComment(Integer reviewId, CommentRequest commentRequest) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new AppException(ErrorCode.REVIEW_NOT_EXISTED));

        // Update the comments list
        review.getComments().clear(); // Clear existing comments if necessary
        review.getComments().add(commentRequest.getComment());

        // Save the updated review
        Review updatedReview = reviewRepository.save(review);

        // Create a success message
        String successMessage = "Comment updated successfully for Review ID: " + reviewId;

        // Return the response
        return ApiResponse.<Review>builder()
                .result(updatedReview)
                .message(successMessage)
                .notifications(List.of(successMessage)) // Add notification
                .build();
    }

    public ApiResponse<Void> deleteComment(Integer reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new AppException(ErrorCode.REVIEW_NOT_EXISTED));

        reviewRepository.delete(review);

        // Create a success message
        String successMessage = "Comment deleted successfully for Review ID: " + reviewId;

        // Return response without result
        return ApiResponse.<Void>builder()
                .message(successMessage)
                .notifications(List.of(successMessage)) // Add notification
                .build();
    }

    public List<Review> getCommentsForEvent(Integer eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new AppException(ErrorCode.EVENT_NOT_EXISTED));

        return reviewRepository.findByEvent(event);
    }

    public Review getCommentById(Integer reviewId) {
        return reviewRepository.findById(reviewId)
                .orElseThrow(() -> new AppException(ErrorCode.REVIEW_NOT_EXISTED));
    }

//    public List<Review> getReviewsByUserId(User user) {
//        return reviewRepository.findByUser(user);
//    }
}