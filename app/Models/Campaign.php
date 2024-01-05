<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Campaign extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'user_id',
        'title',
        'description',
        'goal_amount',
        'current_amount',
        'end_date',
        'is_active',
    ];

    public static function fromId(int $id): self
    {
        return self::where('id', $id)->first();
    }

    public function getUuid(): string
    {
        return $this->uuid;
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function getUserId(): int
    {
        return $this->user_id;
    }

    public function getUser(): User
    {
        return User::fromId($this->getUserId());
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function setTitle(string $title): void
    {
        $this->title = $title;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function setDescription(string $description): void
    {
        $this->description = $description;
    }

    public function getGoalAmount(): string
    {
        return (string) $this->goal_amount;
    }

    public function setGoalAmount(string $goalAmount): void
    {
        $this->goal_amount = $goalAmount;
    }

    public function getCurrentAmount(): string
    {
        return (string) $this->current_amount;
    }

    public function setCurrentAmount(string $currentAmount): void
    {
        $this->current_amount = $currentAmount;
    }

    public function getEndDate()
    {
        return $this->end_date;
    }

    public function getParsedEndDate(): Carbon
    {
        return Carbon::parse($this->getEndDate(), 'EST');
    }

    public function setEndDate(Carbon $endDate): void
    {
        $this->end_date = $endDate;
    }

    public function isActive(): bool
    {
        return (int) $this->is_active === 1;
    }

    public function activate(): void
    {
        $this->is_active = true;
    }

    public function isNotActive(): bool
    {
        return !$this->isActive();
    }

    public function deactivate(): void
    {
        $this->is_active = false;
    }
}
