# -*- coding: utf-8 -*-
'''项目管理操作

@author: Wang Qianxiang
'''

from .db import db
from .role import identity
from .db import Project
from .db import User
from .db import ProjectMember
from peewee import SQL
from playhouse.shortcuts import model_to_dict, dict_to_model

def find_project(project_id):
    '''查询项目信息'''
    result = Project.select(
        Project,
        User.username,
        User.email,
        SQL(" '项目经理' AS 'role' ")
    ).join(User, on=(Project.ownerId == User.id)).where(Project.id == project_id)
    return list(result.dicts())[0]

@identity.check_permission("update", 'project')
def update_project(project_id, request):
    '''更新项目信息'''
    print(request, project_id)
    query = Project.update(
                 name = request['name'],
                 detail = request['detail'],
                 type = request['type'],
                 status = request['status'],
                 startDate = request['startDate'],
                 endDate = request['endDate']).where(Project.id == project_id)
    query.execute()
    result = Project.select().where(Project.id == project_id)
    return list(result.dicts())


def find_users():
    '''查询所有用户列表'''
    with db.cursor() as cursor:
        sql = "SELECT id, username, email FROM user WHERE status='active'"
        cursor.execute(sql)
        result = cursor.fetchall()
    return result


def find_project_users(project_id):
    '''查询项目用户列表 '''
    query = User.select(ProjectMember.id, User.username, User.email, ProjectMember.role, ProjectMember.projectId)\
                .join(ProjectMember, on=(User.id == ProjectMember.memberId)).where(User.status == 'active' and ProjectMember.projectId == project_id)
    return list(query.dicts())


@identity.check_permission("update", 'project')
def update_project_users(project_id, request):
    '''更新项目成员'''
    with db.cursor() as cursor:
        try:
            sql = "DELETE FROM projectmember WHERE projectId=%s"
            cursor.execute(sql, (project_id))

            sql = "INSERT INTO projectmember (projectId,memberId) VALUES (%s, %s)"
            cursor.executemany(
                sql,
                tuple(
                    (project_id, member) for member in request['memberIdArr']))
            db.commit()
        except:
            db.rollback()
    return find_project_users(project_id)

def fuzzy_query(query):
    name = '%' + query['name'] +'%'
    query = User.select().where(User.username % name)
    return list(query.dicts())