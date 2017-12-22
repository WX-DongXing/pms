# -*- coding: utf-8 -*-
'''测试集操作'''

from .db import database, TestCase, TestSet, TestSetBase, Case_Set, User, ProjectMember, Release

def change_case_set(test_set, set_id):
    '''更改测试案例和测试集关系'''
    Case_Set.delete().where(Case_Set.setId == set_id).execute()

    for case_id in test_set.pop('testCase'):
        Case_Set.create(caseId=case_id, setId=set_id)


def create_test_set(test_set):
    '''新建测试集'''
    test_set['projectId'] = Release.select().where(Release.id == test_set['releaseId']).get().projectId

    with database.atomic():
        set_id = TestSetBase.create(**{
            'name': test_set['name'],
            'detail': test_set['detail'],
            'projectId': test_set['projectId'],
            'releaseId': test_set['releaseId'],
            'memberId': test_set['memberId']
        }).id

        change_case_set(test_set, set_id)
    
    return test_set_detail(set_id)



def update_test_set(test_set):
    '''更新测试集'''
    test_set['projectId'] = Release.select().where(Release.id == test_set['releaseId']).get().projectId

    with database.atomic():
        TestSet.update(
            name=test_set['name'],
            detail=test_set['detail'],
            projectId=test_set['projectId'],
            releaseId=test_set['releaseId'],
            memberId=test_set['memberId']
        ).where(TestSet.id == test_set['id']).execute()

        change_case_set(test_set, test_set['id'])

    return test_set_detail(test_set['id'])


def test_set_detail(set_id):
    '''获取测试集详情'''
    set_detail = TestSet.sfind(
        TestSet,
        User.username.alias('member')
    ).join(
        User,
        on=(TestSet.memberId == User.id)
    ).where(TestSet.id == set_id).get()

    set_detail['case'] = list(Case_Set.find(TestCase).join(TestCase, on = (Case_Set.caseId == TestCase.id)).where(Case_Set.setId == set_id))

    return set_detail


def find_test_set_by_id(test_set_id):
    '''按test_set_id查询测试集'''
    return TestSet.getOne(TestSet.id == test_set_id)
