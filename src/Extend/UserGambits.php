<?php

namespace FoF\UserDirectory\Extend;

use Flarum\Event\ConfigureUserGambits;
use Flarum\Extend\ExtenderInterface;
use Flarum\Extension\Extension;
use Flarum\Search\GambitManager;
use FoF\UserDirectory\Gambit\NotGroupGambit;
use Illuminate\Contracts\Container\Container;

class UserGambits implements ExtenderInterface
{
    public function extend(Container $container, Extension $extension = null)
    {
        $container['events']->listen(ConfigureUserGambits::class, [$this, 'gambits']);
    }

    public function gambits(ConfigureUserGambits $event)
    {
        if ($event->gambits instanceof GambitManager) {
            $event->gambits->add(NotGroupGambit::class);
        }
    }
}
