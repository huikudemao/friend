package com.example.demo;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.demo.entity.Friends;
import com.example.demo.mapper.FriendsMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;


@SpringBootTest
class DemoApplicationTests {

	@Test
	void contextLoads() {
	}

  @Autowired
  private FriendsMapper friendsMapper;

  @Test
  public void selectWrapper() {
    QueryWrapper<Friends> queryWrapper = new QueryWrapper<>();
    queryWrapper.orderByDesc("id");//格式：(字段，值）
    List<Friends> list = friendsMapper.selectList(queryWrapper);
    list.forEach(System.out::println);
  }


}
