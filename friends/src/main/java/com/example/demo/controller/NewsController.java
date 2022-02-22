package com.example.demo.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.demo.common.Result;
import com.example.demo.entity.News;
import com.example.demo.mapper.NewsMapper;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

//定义返回数据，一般是json
@RestController
//路由
@RequestMapping("/news")
public class NewsController {
  //  引入Mapper
  @Resource
  NewsMapper newsMapper;

  //  id倒序查询
  @GetMapping
  public Result<?> selectWrapper() {
    QueryWrapper<News> queryWrapper = new QueryWrapper<>();
    queryWrapper.orderByDesc("id");//格式：(字段，值）
    List<News> list = newsMapper.selectList(queryWrapper);
    return Result.success(list);
  }

  //查询并携带与id相关的数据
  @GetMapping("/{id}")
  public Result<?> getById(@PathVariable Long id) {
    return Result.success(newsMapper.selectById(id));
  }

  // 查询包含title的内容
  @GetMapping("/page")
  public Result<?> selectListWrapper(@RequestParam(defaultValue = " ") String title) {
    QueryWrapper<News> queryWrapper = new QueryWrapper<News>();
    queryWrapper.like("title", title);//格式：(字段，值）
    List<News> list = newsMapper.selectList(queryWrapper);

    return Result.success(list);
  }
}
