<?php

namespace FoF\UserDirectory\Gambit;

use Flarum\Group\GroupRepository;
use Flarum\Search\AbstractRegexGambit;
use Flarum\Search\AbstractSearch;
use Flarum\User\Search\UserSearch;
use LogicException;

class NotGroupGambit extends AbstractRegexGambit
{
    /**
     * {@inheritdoc}
     */
    protected $pattern = 'notGroup:(.+)';

    /**
     * @var GroupRepository
     */
    protected $groups;

    /**
     * @param GroupRepository $groups
     */
    public function __construct(GroupRepository $groups)
    {
        $this->groups = $groups;
    }

    /**
     * {@inheritdoc}
     */
    protected function conditions(AbstractSearch $search, array $matches, $negate)
    {
        if (!$search instanceof UserSearch) {
            throw new LogicException('This gambit can only be applied on a UserSearch');
        }
        $groupName = trim($matches[1], '"');
        $groupName = explode(',', $groupName);
        $ids = [];
        foreach ($groupName as $name) {
            $group = $this->groups->findByName($name);
            if ($group && count($group->users)) {
                $ids = array_merge($ids, $group->users->pluck('id')->all());
            }
        }
        $search->getQuery()->whereNotIn('id', $ids, 'and', $negate);
    }
}
