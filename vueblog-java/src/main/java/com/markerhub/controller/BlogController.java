package com.markerhub.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.markerhub.common.lang.Result;
import com.markerhub.service.BlogService;
import org.apache.shiro.authz.annotation.RequiresAuthentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BlogController {

    @Autowired
    BlogService blogService;

    @GetMapping("/blogs")
    @RequiresAuthentication
    public Result blogs(Integer currentPage) {

        if(currentPage == null || currentPage < 1) currentPage = 1;

        Page page = new Page(currentPage, 10);
        IPage pageData = blogService.page(page);

        return Result.succ(pageData);
    }

}
