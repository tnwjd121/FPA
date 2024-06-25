package com.fpa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.fpa.domain.user;
@CrossOrigin
public interface UserRepository extends JpaRepository<user, Long> {
	

}
